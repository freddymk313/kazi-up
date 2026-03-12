const footerLinks = {
  Produit: ["Fonctionnalités", "Modèles", "Tarifs", "FAQ"],
  Entreprise: ["À propos", "Blog", "Carrières", "Contact"],
  Légal: ["Confidentialité", "Conditions", "Cookies"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 border-t border-background/10">
      <div className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold text-background">
              kazi<span className="text-primary">Up</span>
            </span>
            <p className="text-sm text-background/60 max-w-xs">
              Le générateur de CV #1 pour les professionnels congolais. Créez, personnalisez et téléchargez votre CV en minutes.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-background text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 text-center text-sm text-background/40">
          © {new Date().getFullYear()} kaziUp. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
