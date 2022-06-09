import React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface IInputRule {
  msg: string;
  isError: boolean;
}

export interface ITypes {
  value: string;
  label: string;
}

export interface IChildren {
  children: React.ReactNode;
}

export type ExtendOmit<T> = Omit<T, 'type'>;

export type MUISxStyle = SxProps<Theme>;

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ReactOnChange = (e: React.FormEvent<Element>) => void;
