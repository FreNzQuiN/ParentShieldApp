import { theme } from '@/styles'

const scrollbarCSS = `
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;

        background: ${theme.color.secondary.lightOrange};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${theme.color.secondary.lightOrange};
    }
`

export default scrollbarCSS
