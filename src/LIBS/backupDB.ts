import { spawn } from 'child_process';
import path, { dirname } from 'path';

const DB_NAME = 'test';
const ARCCHIVE_PATH = path.join(__dirname, '..', '..', '..', 'BackupBD_MongoDB', `${DB_NAME}.gzip`);

export const backupDB_MongoDB = () => {
	const child = spawn('mongodump', [`--db=${DB_NAME}`, `--archive=${ARCCHIVE_PATH}`, '--gzip']);

	child.stdout.on('data', (data) => {
		console.log('stout:\n', data);
	});
	child.stderr.on('data', (data) => {
		console.log('stderr:\n', Buffer.from(data).toString());
	});
	child.on('error', (error) => {
		console.log('error:\n', error);
	});
	child.on('exit', (code, signal) => {
		if (code) console.log('Process exit with code: ', code);
		else if (signal) console.log('Process killed with signal: ', signal);
		else console.log('Backup is succesfull');
	});
};
