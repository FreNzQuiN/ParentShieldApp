import React from 'react'

import { cx } from "@emotion/css";
import { CardProps } from './types'
import { Paragraph } from '@/typography'

import { sCard, sCardContent, sCardIcon} from './styles'
import { getCardVariant } from './helpers';

const Card = ({title, children, icon, variant, ...props}: CardProps) => {
  return (
    <section className={sCard} {...props}>
        <Paragraph variant="m" weight="light">
            {title}
        </Paragraph>
        <div className={sCardContent}>
            <Paragraph variant="xl" weight="bold" className={cx(getCardVariant(variant))}>
                {children}
            </Paragraph>
            <div className={sCardIcon}>
                {icon}
            </div>  
        </div>
    </section>
  );
}

export default Card