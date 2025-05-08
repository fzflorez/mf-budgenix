import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import useBudget from '../hooks/useBudget';
import DisplayAmount from './DisplayAmount';
import 'react-circular-progressbar/dist/styles.css';

export default function FormTracker() {
  const { state, dispatch, totalSpent, availableBudget } = useBudget();

  const percentage = +((totalSpent / state.budget) * 100).toFixed(2);

  return (
    <div className=' flex flex-col gap-5 items-center justify-center md:flex-row md:justify-evenly lg:justify-around'>
      <div className='  min-w-40 w-full max-w-60 md:max-w-72 lg:max-w-80'>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#37b982',
            trailColor: '#F5F5F5',
            textSize: 10,
            textColor: percentage === 100 ? '#DC2626' : '#37b982',
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className=' space-y-2 md:space-y-4'>
        <button
          className=' bg-emerald-500 rounded-md w-full p-2 text-gray-200 font-semibold text-base hover:bg-emerald-600 transition-colors duration-300 md:text-xl'
          onClick={() => dispatch({ type: 'restart-app' })}
        >
          Resetear App
        </button>

        <DisplayAmount label='Presupuesto' amount={state.budget} />

        <DisplayAmount label='Disponible' amount={availableBudget} />

        <DisplayAmount label='Gastado' amount={totalSpent} />
      </div>
    </div>
  );
}
