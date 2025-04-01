const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // await db.insert(user).values({
    //   username: "i@xiaozi.cc",
    //   password: hashedPassword,
    // });
    console.log(hashedPassword);

    console.log("管理员用户创建成功！");
    console.log("用户名: admin");
    console.log("密码: admin123");
  } catch (error) {
    console.error("创建管理员用户失败:", error);
  }
}

createAdmin();
