const strapi = require ("@strapi/strapi");
strapi().load().then(async(app) => {
    const adminEmail = "abdulqudusjmh@gmail.com";
    const newPassword = "yeatAJ2093$";

    try {
        const user = await app.query("admin::user").findOne({ where: { email: adminEmail } });
        if (user) {    
            await app.query("admin::user").update({
                where: { email: adminEmail },
                data: { password: await strapi.service("admin::auth").hashPassword(newPassword) },
            });
            console.log("Password reset successful!");
        } else {
            console.log("Admin not found - Create a new one via the /admin page");
        }
    } catch (err) {
        console.error("Error resetting password:", err);
    }
    process.exit(0);
});