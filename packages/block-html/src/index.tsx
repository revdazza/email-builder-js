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

export const HtmlPropsSchema = z.object({
  style: z
    .object({
      color: COLOR_SCHEMA,
      backgroundColor: COLOR_SCHEMA,
      fontFamily: FONT_FAMILY_SCHEMA,
      fontSize: z.number().min(0).optional().nullable(),
      textAlign: z.enum(['left', 'right', 'center']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      contents: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type HtmlProps = z.infer<typeof HtmlPropsSchema>;

export function Html({ style, props }: HtmlProps) {
  const children = props?.contents;
  const cssStyle: CSSProperties = {
    color: style?.color ?? undefined,
    backgroundColor: style?.backgroundColor ?? undefined,
    fontFamily: getFontFamily(style?.fontFamily),
    fontSize: style?.fontSize ?? undefined,
    textAlign: style?.textAlign ?? undefined,
    padding: getPadding(style?.padding),
  };
  if (!children) {
    return <div style={cssStyle} />;
  }
  return <div style={cssStyle} dangerouslySetInnerHTML={{ __html: children }} />;
}
