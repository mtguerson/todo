import styles from './Button.module.css'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({ ...rest }: Props) {
  return (
    <button className={styles.container} {...rest}>
      Criar
    </button>
  )
}