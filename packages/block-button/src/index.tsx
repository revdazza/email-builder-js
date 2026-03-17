import React, { CSSProperties } from 'react';
import { z } from 'zod';

const FONT_FAMILY_SCHEMA = z.string().nullable().optional();

const FONT_MAP: Record<string, string> = {
  // Sans-serif
  APFEL_GROTEZK: "'Apfel Grotezk', sans-serif",
  ARCHIVO: "'Archivo', sans-serif",
  ARCHIVO_BLACK: "'Archivo Black', sans-serif",
  ARCHIVO_NARROW: "'Archivo Narrow', sans-serif",
  COOPER_HEWITT: "'Cooper Hewitt', sans-serif",
  FIVO_SANS: "'Fivo Sans', sans-serif",
  INTER: "'Inter', sans-serif",
  KARRIK: "'Karrik', sans-serif",
  LEXEND: "'Lexend', sans-serif",
  LINEAL: "'Lineal', sans-serif",
  MONTSERRAT: "'Montserrat', sans-serif",
  OPEN_SANS: "'Open Sans', sans-serif",
  OPEN_SAUCE_SANS: "'Open Sauce Sans', sans-serif",
  OPEN_SAUCE_ONE: "'Open Sauce One', sans-serif",
  OPEN_SAUCE_TWO: "'Open Sauce Two', sans-serif",
  OSWALD: "'Oswald', sans-serif",
  POPPINS: "'Poppins', sans-serif",
  RADIO_CANADA: "'Radio Canada', sans-serif",
  RADIO_CANADA_BIG: "'Radio Canada Big', sans-serif",
  ROBOTO: "'Roboto', sans-serif",
  UNCUT_SANS: "'Uncut Sans', sans-serif",
  // Serif
  CANADA_1500: "'Canada 1500', serif",
  CRIMSON_PRO: "'Crimson Pro', serif",
  EB_GARAMOND: "'EB Garamond', serif",
  FANWOOD: "'Fanwood', serif",
  INSTRUMENT_SERIF: "'Instrument Serif', serif",
  LORA: "'Lora', serif",
  MERRIWEATHER: "'Merriweather', serif",
  MINIPAX: "'Minipax', serif",
  NYGHT_SERIF: "'Nyght Serif', serif",
  PLAYFAIR: "'Playfair', serif",
  REDACTION: "'Redaction', serif",
  SPRAT: "'Sprat', serif",
  // Display
  BAJADERKA: "'Bajaderka', cursive",
  BB_BOUQUET: "'BB Bouquet', cursive",
  LEAGUE_GOTHIC: "'League Gothic', sans-serif",
  LEAGUE_SCRIPT: "'League Script', cursive",
  OSTRICH_SANS: "'Ostrich Sans', sans-serif",
  // System
  GEORGIA: 'Georgia, serif',
  TIMES_NEW_ROMAN: "'Times New Roman', serif",
  ARIAL: 'Arial, sans-serif',
  VERDANA: 'Verdana, sans-serif',
  COURIER_NEW: "'Courier New', monospace",
  // Legacy keys
  MODERN_SANS: '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif',
  BOOK_SANS: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
  ORGANIC_SANS: 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif',
  GEOMETRIC_SANS: 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif',
  HEAVY_SANS: 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif',
  ROUNDED_SANS: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif',
  MODERN_SERIF: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif',
  BOOK_SERIF: '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif',
  MONOSPACE: '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace',
};

function getFontFamily(fontFamily: string | null | undefined): string | undefined {
  if (!fontFamily) return undefined;
  return FONT_MAP[fontFamily];
}

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const ButtonPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      fontSize: z.number().min(0).optional().nullable(),
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      buttonBackgroundColor: COLOR_SCHEMA,
      buttonStyle: z.enum(['rectangle', 'pill', 'rounded']).optional().nullable(),
      buttonTextColor: COLOR_SCHEMA,
      fullWidth: z.boolean().optional().nullable(),
      size: z.enum(['x-small', 'small', 'large', 'medium']).optional().nullable(),
      text: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

function getRoundedCorners(props: ButtonProps['props']) {
  const buttonStyle = props?.buttonStyle ?? ButtonPropsDefaults.buttonStyle;

  switch (buttonStyle) {
    case 'rectangle':
      return undefined;
    case 'pill':
      return 64;
    case 'rounded':
    default:
      return 4;
  }
}

function getButtonSizePadding(props: ButtonProps['props']) {
  const size = props?.size ?? ButtonPropsDefaults.size;
  switch (size) {
    case 'x-small':
      return [4, 8] as const;
    case 'small':
      return [8, 12] as const;
    case 'large':
      return [16, 32] as const;
    case 'medium':
    default:
      return [12, 20] as const;
  }
}

export const ButtonPropsDefaults = {
  text: '',
  url: '',
  fullWidth: false,
  size: 'medium',
  buttonStyle: 'rounded',
  buttonTextColor: '#FFFFFF',
  buttonBackgroundColor: '#999999',
} as const;

export function Button({ style, props }: ButtonProps) {
  const text = props?.text ?? ButtonPropsDefaults.text;
  const url = props?.url ?? ButtonPropsDefaults.url;
  const fullWidth = props?.fullWidth ?? ButtonPropsDefaults.fullWidth;
  const buttonTextColor = props?.buttonTextColor ?? ButtonPropsDefaults.buttonTextColor;
  const buttonBackgroundColor = props?.buttonBackgroundColor ?? ButtonPropsDefaults.buttonBackgroundColor;

  const padding = getButtonSizePadding(props);
  const textRaise = (padding[1] * 2 * 3) / 4;
  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    textAlign: style?.textAlign ?? undefined,
    padding: getPadding(style?.padding),
  };
  const linkStyle: CSSProperties = {
    color: buttonTextColor,
    fontSize: style?.fontSize ?? 16,
    fontFamily: getFontFamily(style?.fontFamily),
    fontWeight: style?.fontWeight ?? 'bold',
    backgroundColor: buttonBackgroundColor,
    borderRadius: getRoundedCorners(props),
    display: fullWidth ? 'block' : 'inline-block',
    padding: `${padding[0]}px ${padding[1]}px`,
    textDecoration: 'none',
  };

  return (
    <div style={wrapperStyle}>
      <a href={url} style={linkStyle} target="_blank">
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`,
          }}
        />
        <span>{text}</span>
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`,
          }}
        />
      </a>
    </div>
  );
}
