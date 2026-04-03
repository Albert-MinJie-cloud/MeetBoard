export default ({ config }) => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    ...config,
    extra: {
      apiUrl: isProd
        ? "https://open.feishu.cn/open-apis" // 生产环境
        : "https://open.feishu.cn/open-apis", // 开发环境（飞书无测试环境则共用）
    },
  };
};
