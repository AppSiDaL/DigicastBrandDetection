interface DropDownProps {
  setModel: React.Dispatch<React.SetStateAction<string>>;
  model: string;
  models: any[];
}
export default function DropDown({ model, setModel, models }: DropDownProps) {
  return (
    <div>
      <h2>Seleccionar Modelo para Probar</h2>
      <select
        className="text-black"
        aria-label="Default select example"
        defaultValue={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
    </div>
  );
}
