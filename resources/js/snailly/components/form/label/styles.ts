import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sLabel = css`
    color: ${theme.color.secondary.black};
    font-size: ${theme.font.size[14]};
    font-weight: ${theme.font.weight.semibold};
    letter-spacing: 0.01em;
`

export const sLabelWhite = css`
    color: ${theme.color.primary.white};
    font-size: ${theme.font.size[14]};
    font-weight: ${theme.font.weight.semibold};
    letter-spacing: 0.01em;
`
