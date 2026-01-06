function createTestUser(role: 'user' | 'admin' = 'user') {
    const id = Date.now() + Math.random();

    return {
        email: `${role}_${id}@test.com`,
        username: `${role}_${id}`,
        password: '12345',
    };
}

export default createTestUser;
