import bycryptjs from 'bcryptjs';

const users = [
  {
    name: 'admin',
    email: 'admin@example.com',
    password: bycryptjs.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'summer',
    email: 'summer@example.com',
    password: bycryptjs.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: 'henry',
    email: 'henry@example.com',
    password: bycryptjs.hashSync('123456', 10),
    isAdmin: false
  },
]

export default users;
