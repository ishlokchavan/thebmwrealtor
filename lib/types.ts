export type StateRow = {
  id: string;
  name: string;
};

export type CityRow = {
  id: string;
  name: string;
  state_id: string;
};

export type InquiryPhoto = {
  id: string;
  url: string;
  storagePath: string;
};
