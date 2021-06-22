import { useAppDispatch, useAppSelector, play, reset } from "./store";

export function TicTacToe() {
  const state = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  return (
    <div className="ticTacToe">
      {state.winner !== "?" && (
        <>
          {state.winner === "=" && <div>Draw!</div>}
          {state.winner !== "=" && (
            <div>
              Winner: <strong>{state.winner}</strong>
            </div>
          )}
        </>
      )}
      {state.winner === "?" && <div>Waiting move of {state.nextPlayer}</div>}
      <table>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td onClick={() => dispatch(play({ i, j }))} key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => dispatch(reset())}>Restart Match</button>
    </div>
  );
}
