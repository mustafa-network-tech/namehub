/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ön açılış aşaması: "/" artık landing sayfasını render eder; iç rotalar
  // middleware ile gizlenir. Bu nedenle eski "/" -> "/tr" yönlendirmesi kaldırıldı.
};

module.exports = nextConfig;
