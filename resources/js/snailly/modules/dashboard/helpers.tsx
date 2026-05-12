import { Status } from '@/components';

export const getStatusComponent = (item: any) => {
  if (item.classified_url && item.classified_url.length > 0) {
    if (item.classified_url[0]["FINAL_label"] !== "aman" && item.classified_url[0]["FINAL_label"] !== "bahaya" && item.grant_access === null) {
      return <Status type="not labelling">Not Labelling</Status>;
    } else if (item.classified_url[0]["FINAL_label"] === "aman" && item.grant_access === true) {
      return <Status type="positive">Positive</Status>;
    } else {
      return <Status type="negative">Negative</Status>;
    }
  } else if (item.grant_access === true) {
    return <Status type="positive">Positive</Status>;
  } else if (item.grant_access === false) {
    return <Status type="negative">Negative</Status>;
  } else {
    return <Status type="not labelling">Not Labelling</Status>;
  }
};


export const calculateGoodPercentage = (data: any) => {
  const totalValue = data.reduce((total, item) => total + (Number(item.value) || 0), 0);

  if (!totalValue) {
    return '0';
  }

  const goodItem = data.find((item) => item.name === 'Good');
  const goodPercentage = ((Number(goodItem?.value) || 0) / totalValue) * 100;

  return goodPercentage.toFixed();
};
