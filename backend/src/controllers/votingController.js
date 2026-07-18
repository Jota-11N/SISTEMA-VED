const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configuración simulada de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER || 'votaciones@unajma.edu.pe',
        pass: process.env.EMAIL_PASS || 'passwordFalso123'
    }
});

exports.processVote = async (req, res) => {
    try {
        const { email, selections } = req.body;

        // 1. Simular la invocación al Smart Contract en Hyperledger Fabric
        // En una integración real, aquí se usaría fabric-network para invocar la chaincode
        const transactionId = '0x' + crypto.randomBytes(32).toString('hex');
        const blockNumber = Math.floor(Math.random() * 1000) + 1;

        // 2. Generación de CVE firmado criptográficamente (HMAC)
        const secret = process.env.CVE_SECRET || 'fallbackSecret';
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(transactionId);
        const digest = hmac.digest('hex').toUpperCase();
        
        // Formatear CVE: VED-2026-XXXX-XXXX
        const cve = `VED-2026-${digest.substring(0, 4)}-${digest.substring(4, 8)}`;

        // 3. Simular inserción en PostgreSQL
        // const query = 'INSERT INTO electoral_records (transaction_id, cve, block_number) VALUES ($1, $2, $3)';
        // await pool.query(query, [transactionId, cve, blockNumber]);
        console.log(`[DB] CVE Registrado exitosamente: ${cve} -> TxID: ${transactionId}`);

        // 4. Enviar correo institucional con Nodemailer
        const mailOptions = {
            from: '"Comité Electoral UNAJMA" <votaciones@unajma.edu.pe>',
            to: email || 'estudiante@unajma.edu.pe',
            subject: 'Confirmación de Participación Electoral - UNAJMA',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <h2 style="color: #b91c1c; text-align: center;">UNAJMA - Sistema VED</h2>
                    <p>Estimado elector,</p>
                    <p>Su participación en las <strong>Elecciones Universitarias UNAJMA 2026</strong> ha sido registrada exitosamente de forma inmutable en la red Blockchain.</p>
                    
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-PE')}</li>
                            <li><strong>Hora:</strong> ${new Date().toLocaleTimeString('es-PE')}</li>
                            <li><strong>Transaction ID:</strong> ${transactionId}</li>
                            <li><strong>C.V.E:</strong> <span style="font-size: 18px; font-weight: bold; color: #0f172a;">${cve}</span></li>
                            <li><strong>Bloque:</strong> #${blockNumber}</li>
                        </ul>
                    </div>

                    <p style="font-size: 11px; color: #64748b; font-style: italic; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                        REGLA CRÍTICA DE ANONIMATO: Este correo únicamente certifica su participación democrática. 
                        No contiene información sobre el sentido del voto ni la opción seleccionada, garantizando el secreto electoral absoluto.
                    </p>
                </div>
            `
        };

        // En un entorno real esto enviaría el correo. Capturamos el error para no crashear por credenciales fake
        try {
            // await transporter.sendMail(mailOptions);
            console.log(`[EMAIL] Correo enviado a ${mailOptions.to}`);
        } catch (error) {
            console.error('[EMAIL] Error simulado:', error.message);
        }

        res.status(200).json({
            success: true,
            data: {
                transactionId,
                cve,
                blockNumber,
                status: 'Validado en Nodo'
            }
        });

    } catch (error) {
        console.error('Error procesando voto:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};
