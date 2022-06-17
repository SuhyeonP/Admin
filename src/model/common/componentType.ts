import React from 'react';

export interface IChildren {
  children: React.ReactNode;
}

export type ExtendOmit<T> = Omit<T, 'type'>;
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactOnChange = (e: React.FormEvent<Element>) => void;
