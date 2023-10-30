import { classJoin } from "@nomic-ui/utils";
import styles from "./skeleton-loader.module.css"

export interface Props {
  children: JSX.Element;
  isLoading: boolean;
  height: string;
  width?: string;
  className?: string;
}

const filterClasses = (classes: string | undefined) => {
  if (!classes) return "";
  return classes.split(" ").filter((value) => {
    return value.includes("w-") || value.includes("h-") || value.includes("rounded-");
  }).join(' ');
}

export function SkeletonLoader({children, height, width = 'auto', isLoading, className}: Props) {
  return (
    ( isLoading ? (
      <div
      style={{
        height: height,
        width: width
      }}
        className={classJoin(
          `${filterClasses(children.props.className)}`,
          "bg-modalTooltip",
          styles['container'],
          className ? className : "",
        )}>
      </div>)
    : <div>{children}</div>
    )
  );
};


export default SkeletonLoader;
