import { CardContentVariant } from "./types";
import { sCardContentAll, sCardContentPositive, sCardContentNegative } from "./styles";

export const getCardVariant = (variant: CardContentVariant) => {
  switch (variant) {
    case "allContent":
      return sCardContentAll;

    case "positive":
      return sCardContentPositive;

    case "negative":
          return sCardContentNegative;
      
    default:
      return sCardContentAll;
  }
};
