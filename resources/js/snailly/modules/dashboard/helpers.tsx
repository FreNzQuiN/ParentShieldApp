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
  // Hitung total nilai dari semua data
  const totalValue = data.reduce((total, item) => total + item.value, 0);

  // Hitung persentase konten "Good"
  const goodItem = data.find((item) => item.name === 'Good');
  const goodPercentage = (goodItem?.value / totalValue) * 100;

  return goodPercentage.toFixed();
};
