import fs from 'fs';
import path from 'path';

async function run() {
  try {
    const pdfModule = await import('pdf-parse');
    console.log('PDFParse type:', typeof pdfModule.PDFParse);
    
    // Just to see if it works
    // Assuming there's a pdf in public/resume/SAILESH-P.pdf
    const buffer = fs.readFileSync(path.join(process.cwd(), 'public/resume/SAILESH-P.pdf'));
    
    try {
      const parser = new (pdfModule as any).PDFParse({ data: buffer });
      console.log('parser created', typeof parser.getText);
      const res = await parser.getText();
      console.log('text length:', res.text.length);
    } catch (err) {
      console.error('Error with PDFParse approach:', err);
    }

    try {
      // is there a default exported via commonjs? 
      // sometimes require('pdf-parse') returns a function directly, 
      // while import('pdf-parse') gives the exports object.
      const pdfParseDirect = require('pdf-parse');
      console.log('require(pdf-parse) type:', typeof pdfParseDirect);
      const res = await pdfParseDirect(buffer);
      console.log('text length via require:', res.text.length);
    } catch (err) {
      console.error('Error with require approach:', err);
    }

  } catch (e) {
    console.error(e);
  }
}
run();
