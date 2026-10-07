import { useEffect } from 'react'

/** Define o título da aba enquanto a página estiver aberta e restaura o anterior ao sair. */
export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
