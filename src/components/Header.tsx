interface HeaderProps {
  readonly onReset: () => void;
}

export const Header = ({ onReset }: HeaderProps) => (
  <header className="header">
    <h1>🛍️ Panel sklepu</h1>
    <button onClick={onReset} className="reset-btn">
      🔄 Resetuj filtry
    </button>
  </header>
);
