import React from 'react'
import { Global as GlobalProvider, css } from '@emotion/react'

import { theme } from '@/styles'

import scrollbar from '../scrollbar'

const sGlobal = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: ${theme.font.family};
    }

    html,
    body,
    #app {
        width: 100%;
        min-height: 100%;
    }

    body {
        background:
            radial-gradient(circle at top left, rgba(78, 119, 63, 0.12), transparent 34%),
            radial-gradient(circle at top right, rgba(145, 166, 89, 0.12), transparent 24%),
            linear-gradient(180deg, #f6f8f4 0%, #eef3ea 100%);
        color: ${theme.color.secondary.black};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    button,
    input,
    select,
    textarea {
        font: inherit;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ${scrollbar}
`

const Global = () => {
    return <GlobalProvider styles={sGlobal} />
}

export default Global
