type RestartModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function RestartModal({
  onConfirm,
  onCancel,
}: RestartModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-2xl shadow-lg text-center max-w-sm w-full">
        <p className="text-lg mb-6">
          ¿Estás seguro de que deseas reiniciar la aplicación? <br />
          Se borrarán todos tus datos de presupuesto y gastos.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-emerald-400 hover:bg-emerald-600 text-gray-200 font-bold py-2 px-6 rounded-md transition ease-in-out duration-300"
          >
            Sí
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-gray-200 font-bold py-2 px-6 rounded-md transition ease-in-out duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
