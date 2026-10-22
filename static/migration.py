import pandas as pd 
import numpy as np
import os


docs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "storage", "F01A_SF_MNM_SeccionMoneda.xlsx"))

moneda_section_data = pd.read_excel(os.path.join(docs_path))
print(moneda_section_data.head())
print(moneda_section_data.info())

columnas = moneda_section_data.columns.tolist()

moneda_section_data = moneda_section_data.drop(columns =["SIGNATURAS ANTIGUAS", 
                                                         "UBICACIÓN", 
                                                         "TÍTULO DE LA SERIE", 
                                                         "ESPECIFICACIÓN",
                                                         "ROL",
                                                         "TAMAÑO",
                                                         "TIPO",
                                                         "ORIENTACIÓN",
                                                         "FORMA"] + columnas[columnas.index("DESCRIPCIÓN"):])

print(moneda_section_data.shape)

# Save cleaned dataframe to storage directory
cleaned_file_path = os.path.join(os.path.dirname(docs_path), "F01A_SF_MNM_SeccionMoneda_cleaned.xlsx")
moneda_section_data.to_excel(cleaned_file_path, index=False)
print(f"Cleaned data saved to {cleaned_file_path}")

#Hasta este momento ya se quitaron todas las columnas que no se necesitan 



