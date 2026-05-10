import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sParagraph = css`
    color: ${theme.color.secondary.black};

    font-size: ${theme.font.size[16]};
    font-weight: 400;
`

export const sParagraphWhite = css`
    color: ${theme.color.primary.white};
`

export const sParagraphDarkGreen = css`
    color: ${theme.color.primary.darkGreen};
`

export const sParagraphLightGreen = css`
    color: ${theme.color.primary.lightGreen};
`

export const sParagraphLight = css`
    font-weight: 300;
`

export const sParagraphSemiBold = css`
    font-weight: 600;
`

export const sParagraphBold = css`
    font-weight: 700;
`

export const sParagraphXS = css`
    font-size: ${theme.font.size[12]};
`

export const sParagraphS = css`
    font-size: ${theme.font.size[14]};
`

export const sParagraphL = css`
    font-size: ${theme.font.size[18]};
`

export const sParagraphXL = css`
    font-size: ${theme.font.size[24]};
`
