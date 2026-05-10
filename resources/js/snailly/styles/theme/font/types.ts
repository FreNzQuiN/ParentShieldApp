export interface FontWeight {
    light: string
    normal: string
    semibold: string
    bold: string
}

export interface FontSize {
    64: string
    52: string
    48: string
    36: string
    30: string
    24: string
    18: string
    16: string
    14: string
    12: string
}

export interface FontHeight {
    64: string
    52: string
    48: string
    36: string
    30: string
    24: string
    18: string
    16: string
    14: string
    12: string
}

export interface Font {
    size: FontSize
    family: string
    weight: FontWeight
    height: FontHeight
}
