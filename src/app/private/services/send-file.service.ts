import { Injectable } from '@angular/core';
import { MyStockService } from './Mystock.service';
import * as XLSX from 'xlsx'; // Importa la biblioteca 'XLSX'



@Injectable({
  providedIn: 'root'
})
export class SendFileService {

  excelData: any;

  constructor(private myStockService: MyStockService) {}

   processFile(file: File): Promise<any> {
     return new Promise((resolve, reject) => {
       const validExtensions = ['.xlsx', '.csv'];
       const fileExtension = file.name.substring(file.name.lastIndexOf('.'));

       if (!validExtensions.includes(fileExtension.toLowerCase())) {
         reject(new Error('Por favor, selecciona un archivo con extensión XLSX o CSV.'));
         return;
       }

       const fileReader = new FileReader();
       fileReader.onload = (e) => {
         const binaryData = e.target?.result;
         const workbook = XLSX.read(binaryData, { type: 'binary' });
         const data: any = [];

         workbook.SheetNames.forEach((sheet: string | number) => {
           const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
           data.push(...sheetData);
         });

         resolve(data);
       };

       fileReader.onerror = (e) => {
         reject(e);
       };

       fileReader.readAsBinaryString(file);
     });
   }

   sendStock(file: File): Promise<void> {
     return new Promise<void>(async (resolve, reject) => {
       try {
         const data = await this.processFile(file);
         this.sendStockToApi(this.splitJSON(data, 50));
         resolve();
       } catch (error) {
         reject(error);
       }
     });

   }

   sendProveedores(file:File){
   return new Promise<void>(async (resolve, reject) => {
       try {
         const data = await this.processFile(file);
         this.sendProveedoresToApi(this.splitJSON(data, 100));
         resolve();
       } catch (error) {
         reject(error);
       }
     });
   }



   splitJSON(jsonData: any, elementosPorPagina: number) {
       const paginas = [];
       for (let i = 0; i < jsonData.length; i += elementosPorPagina) {
         const pagina = jsonData.slice(i, i + elementosPorPagina);
         paginas.push(pagina);
      }
       return paginas;
     }

   generateStockJSON(pagina: any[]): any {
       const content = pagina.map(item => {
         return {
           sku: item.sku,
           price: item.price,
           available_quantity: item.available_quantity
         };
       });

       return {
       user_id: 1,
         content: content
       };
     }

     generateProveedorJSON(pagina: any[]): any {
       const content = pagina.map(item => {
         return {
           sku: item.sku,
           price: item.price,
           availableQuantity: item.available_quantity
         };
       });

       return {
         supplierId: 1,
         content: content
       };
     }

    sendStockToApi(jsonData: any[]) {
       for (let i = 0; i < jsonData.length; i++) {
         const body = this.generateStockJSON(jsonData[i]);
         this.myStockService.postExcel(body).subscribe(
           (response) => {
             console.log("Json:", body);
             console.log(`Página ${i + 1} - Datos enviados con éxito`, response);
             console.log('Datos enviados con éxito', response);
           },
           (error) => {
             console.error('Error al enviar los datos', error);
           }
         );
       }
     }
   sendProveedoresToApi(jsonData: any[]){
     let a = 0;
     for (let i = 0; i < jsonData.length; i++) {
       a + 1;
       const body = this.generateProveedorJSON(jsonData[i]);
       this.myStockService.postStockProveedores(body).subscribe(
         (response) => {
           console.log("Json:", body);
           console.log(`Página ${i + 1} - Datos enviados con éxito`, response);
         },
         (error) => {
           console.error('Error al enviar los datos', error);
        }
       );
     }
     console.log(a+1)
   }
}
