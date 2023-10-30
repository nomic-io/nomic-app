import { classJoin } from "@nomic-ui/utils";

/* eslint-disable-next-line */
export interface CardProps {
  className?: string,
  children?: JSX.Element[] | JSX.Element
}

export function Card({className = "", children}: CardProps) {
  return (
    <div className={classJoin(
      "bg-surface rounded-lg px-6 py-6",
      className
    )}>
       {children} 
    </div>
  );
};


export default Card;
