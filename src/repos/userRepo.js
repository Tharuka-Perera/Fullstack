const users = [
    {
        id: "1",
        email: "user@nsbm.lk",
        passwordHash: "<$2b$10$w7RC>"
    }
];

const userRepo = {
    async findByEmail(email) {
        return users.find(user => user.email === email) || null;
    }
};

function publicUser(user) {
    return {
        id: user.id,
        email: user.email
    };
}

module.exports = {
    userRepo,
    publicUser
};