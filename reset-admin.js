(async () => {
    const { createStrapi } = require('@strapi/strapi');
    const strapi = await createStrapi();
    await strapi.start();

    const email = 'abdulqudusjmh@gmail.com';
    const password = 'yeatAJ2093$$$'

    const adminService = strapi.service('admin::user');
    const existing = await adminService.findOneByEmail(email);

    if (!existing) {
        console.log('[reset-admin] No admin with that email. Nothing to reset.');
    } else {
        await adminService.edit(existing.id, { password });
        console.log('[reset-admin] Password reset SUCCESS for', email);
    }

    await strapi.server.httpServer.close();
    process.exit(0);
})();