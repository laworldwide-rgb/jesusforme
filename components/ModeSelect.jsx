export default function ModeSelect({ onSelect }) {
  return (
    <div>
      <h1>Start Your Bible Adventure</h1>

      <button onClick={() => onSelect("parent")}>
        I'm the Parent
      </button>

      <button onClick={() => onSelect("child")}>
        I'm with my Child
      </button>
    </div>
  );
}
