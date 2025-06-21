export function Button({ children, onClick, className = "", variant = "default", type = "button" }) {
    const base =
      "px-4 py-2 rounded text-white font-semibold transition hover:opacity-90";
    const styles = {
      default: "bg-blue-600",
      outline: "border border-gray-400 text-gray-700 bg-white",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
  