const db = require('../config/db');

// 1. Patient Registration
exports.registerPatient = async (req, res) => {
    const { name, age, gender, department_id, severity } = req.body;
    
    try {
        // Validation
        if (!name || !age || !gender || !department_id || !severity) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (severity < 1 || severity > 5) {
            return res.status(400).json({ message: 'Severity must be between 1 and 5' });
        }

        // Insert Patient
        const [patientResult] = await db.query(
            'INSERT INTO Patients (name, age, gender, department_id) VALUES (?, ?, ?, ?)',
            [name, age, gender, department_id]
        );
        const patientId = patientResult.insertId;

        // Add to Queue
        const [queueResult] = await db.query(
            'INSERT INTO Queue (patient_id, severity, status) VALUES (?, ?, ?)',
            [patientId, severity, 'Waiting']
        );

        res.status(201).json({ message: 'Patient registered and added to queue successfully', queueId: queueResult.insertId });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// 2. Get Current Queue
exports.getQueue = async (req, res) => {
    const { department_id } = req.query;
    
    let query = `
        SELECT q.id as queue_id, p.name as patient_name, p.age, p.gender, d.name as department_name, q.severity, q.arrival_time
        FROM Queue q
        JOIN Patients p ON q.patient_id = p.id
        JOIN Departments d ON p.department_id = d.id
        WHERE q.status = 'Waiting'
    `;
    let queryParams = [];

    if (department_id) {
        query += ` AND p.department_id = ?`;
        queryParams.push(department_id);
    }

    query += ` ORDER BY q.severity DESC, q.arrival_time ASC`;

    try {
        const [rows] = await db.query(query, queryParams);
        res.json(rows);
    } catch (error) {
        console.error('Get Queue Error:', error);
        res.status(500).json({ message: 'Server error while fetching queue' });
    }
};

// 3. Serve Patient
exports.servePatient = async (req, res) => {
    const { department_id } = req.body;
    
    let query = `
        SELECT q.id as queue_id 
        FROM Queue q
        JOIN Patients p ON q.patient_id = p.id
        WHERE q.status = 'Waiting'
    `;
    let queryParams = [];

    if (department_id) {
        query += ` AND p.department_id = ?`;
        queryParams.push(department_id);
    }

    query += ` ORDER BY q.severity DESC, q.arrival_time ASC LIMIT 1`;

    try {
        // 1. Get highest priority patient
        const [rows] = await db.query(query, queryParams);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No patients waiting in queue' });
        }

        const queueId = rows[0].queue_id;

        // 2. Update status to 'Completed'
        await db.query(`UPDATE Queue SET status = 'Completed' WHERE id = ?`, [queueId]);

        // 3. Move to History
        await db.query(`INSERT INTO History (queue_id) VALUES (?)`, [queueId]);

        res.json({ message: 'Patient served successfully', queue_id: queueId });
    } catch (error) {
        console.error('Serve Patient Error:', error);
        res.status(500).json({ message: 'Server error while serving patient' });
    }
};

// 4. Get History
exports.getHistory = async (req, res) => {
    const query = `
        SELECT h.id as history_id, p.name as patient_name, d.name as department_name, q.severity, h.served_time
        FROM History h
        JOIN Queue q ON h.queue_id = q.id
        JOIN Patients p ON q.patient_id = p.id
        JOIN Departments d ON p.department_id = d.id
        ORDER BY h.served_time DESC
    `;
    
    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Get History Error:', error);
        res.status(500).json({ message: 'Server error while fetching history' });
    }
};

// 5. Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalPatientsResult] = await db.query(`SELECT COUNT(*) as count FROM Patients`);
        const [waitingPatientsResult] = await db.query(`SELECT COUNT(*) as count FROM Queue WHERE status = 'Waiting'`);
        const [servedPatientsResult] = await db.query(`SELECT COUNT(*) as count FROM History`);

        res.json({
            totalPatients: totalPatientsResult[0].count,
            waitingPatients: waitingPatientsResult[0].count,
            servedPatients: servedPatientsResult[0].count
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ message: 'Server error while fetching dashboard stats' });
    }
};

// Get Departments
exports.getDepartments = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM Departments`);
        res.json(rows);
    } catch (error) {
        console.error('Get Departments Error:', error);
        res.status(500).json({ message: 'Server error while fetching departments' });
    }
};