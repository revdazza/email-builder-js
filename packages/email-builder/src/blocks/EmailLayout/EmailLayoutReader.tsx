import React from 'react';

import { ReaderBlock } from '../../Reader/core';

import { EmailLayoutProps } from './EmailLayoutPropsSchema';

const FONT_MAP: Record<string, string> = {
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
  BAJADERKA: "'Bajaderka', cursive",
  BB_BOUQUET: "'BB Bouquet', cursive",
  LEAGUE_GOTHIC: "'League Gothic', sans-serif",
  LEAGUE_SCRIPT: "'League Script', cursive",
  OSTRICH_SANS: "'Ostrich Sans', sans-serif",
  GEORGIA: 'Georgia, serif',
  TIMES_NEW_ROMAN: "'Times New Roman', serif",
  ARIAL: 'Arial, sans-serif',
  VERDANA: 'Verdana, sans-serif',
  COURIER_NEW: "'Courier New', monospace",
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

function getFontFamily(fontFamily: EmailLayoutProps['fontFamily']): string {
  if (!fontFamily) return FONT_MAP['MODERN_SANS'];
  return FONT_MAP[fontFamily] ?? FONT_MAP['MODERN_SANS'];
}

function getBorder({ borderColor }: EmailLayoutProps) {
  if (!borderColor) {
    return undefined;
  }
  return `1px solid ${borderColor}`;
}

export default function EmailLayoutReader(props: EmailLayoutProps) {
  const childrenIds = props.childrenIds ?? [];
  return (
    <div
      style={{
        backgroundColor: props.backdropColor ?? '#F5F5F5',
        color: props.textColor ?? '#262626',
        fontFamily: getFontFamily(props.fontFamily),
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '0.15008px',
        lineHeight: '1.5',
        margin: '0',
        padding: '32px 0',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <table
        align="center"
        width="100%"
        style={{
          margin: '0 auto',
          maxWidth: '600px',
          backgroundColor: props.canvasColor ?? '#FFFFFF',
          borderRadius: props.borderRadius ?? undefined,
          border: getBorder(props),
        }}
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
      >
        <tbody>
          <tr style={{ width: '100%' }}>
            <td>
              {childrenIds.map((childId) => (
                <ReaderBlock key={childId} id={childId} />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
