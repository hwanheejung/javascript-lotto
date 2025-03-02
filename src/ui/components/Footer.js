const Footer = () => {
  const Copyright = {
    YEAR: new Date().getFullYear(),
    OWNER: "woowacourse",
  };

  return `
    <footer id="footer" class="text-caption">
      <p>Copyright ${Copyright.YEAR}. ${Copyright.OWNER}</p>
    </footer>
  `;
};

export default Footer;
