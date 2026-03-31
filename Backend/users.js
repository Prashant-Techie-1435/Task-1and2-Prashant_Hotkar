/**
 * data/users.js — In-memory data store
 *
 * Acts as our "database" for this project.
 * In a real app, this would be replaced by a database (MongoDB, MySQL, etc.)
 */

let users = [
  {
    id: 1,
    name: 'Prashant Sharma',
    email: 'prashant@example.com',
    role: 'Full Stack Developer',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java'],
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Anjali Mehta',
    email: 'anjali@example.com',
    role: 'Frontend Developer',
    skills: ['React', 'CSS', 'Figma'],
    createdAt: '2025-02-14T09:30:00.000Z',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    email: 'rohan@example.com',
    role: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB'],
    createdAt: '2025-03-01T14:15:00.000Z',
  },
];

// Auto-incrementing ID counter
let nextId = 4;

module.exports = {
  getAll:    ()          => users,
  getById:   (id)        => users.find(u => u.id === id),
  create:    (userData)  => {
    const newUser = { id: nextId++, ...userData, createdAt: new Date().toISOString() };
    users.push(newUser);
    return newUser;
  },
  update:    (id, data)  => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data, id }; // keep original id
    return users[index];
  },
  remove:    (id)        => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const deleted = users[index];
    users.splice(index, 1);
    return deleted;
  },
};
