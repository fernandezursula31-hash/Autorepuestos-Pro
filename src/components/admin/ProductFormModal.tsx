import React, { useState } from 'react';
import { Product, ProductCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, Wrench, DollarSign, Package } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const CATEGORIES: ProductCategory[] = [
  'Frenos',
  'Suspensión',
  'Motor & Turbo',
  'Iluminación',
  'Filtros & Aceites',
  'Accesorios'
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useApp();

  const [formData, setFormData] = useState({
    sku: productToEdit?.sku || `ARP-${Math.floor(100 + Math.random() * 900)}`,
    name: productToEdit?.name || '',
    category: productToEdit?.category || ('Frenos' as ProductCategory),
    brand: productToEdit?.brand || '',
    price: productToEdit?.price || 120,
    costPrice: productToEdit?.costPrice || 75,
    stock: productToEdit?.stock || 10,
    minStockThreshold: productToEdit?.minStockThreshold || 5,
    image: productToEdit?.image || '/src/assets/images/product_disc_brakes_1792689416762.jpg',
    description: productToEdit?.description || '',
    locationWarehouse: productToEdit?.locationWarehouse || 'Bodega Central - Pasillo A-01',
    compatibleMake: 'Universal',
    compatibleModel: 'Todos los modelos',
    compatibleYear: '2015-2026'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      sku: formData.sku.toUpperCase(),
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: +formData.price,
      costPrice: +formData.costPrice,
      stock: +formData.stock,
      minStockThreshold: +formData.minStockThreshold,
      rating: productToEdit?.rating || 4.8,
      reviewsCount: productToEdit?.reviewsCount || 1,
      image: formData.image,
      description: formData.description || 'Repuesto automotriz fabricado con materiales de alta durabilidad y tolerancia OEM.',
      specifications: productToEdit?.specifications || {
        'Garantía': '12 Meses',
        'Origen': 'Certificación OEM',
        'Acabado': 'Tratamiento anticorrosión'
      },
      compatibleVehicles: productToEdit?.compatibleVehicles || [
        {
          make: formData.compatibleMake,
          model: formData.compatibleModel,
          yearRange: formData.compatibleYear
        }
      ],
      locationWarehouse: formData.locationWarehouse
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              {productToEdit ? 'Editar Repuesto en Inventario' : 'Registrar Nuevo Repuesto / Accesorio'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Código SKU</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Comercial del Repuesto</label>
            <input
              type="text"
              required
              placeholder="Ej. Kit Discos Ventilados Brembo 330mm..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Marca / Fabricante</label>
              <input
                type="text"
                required
                placeholder="Ej. Brembo, Bosch, K&N, RS..."
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ubicación de Almacén</label>
              <input
                type="text"
                required
                placeholder="Ej. Bodega Central - Pasillo B-05"
                value={formData.locationWarehouse}
                onChange={(e) => setFormData({ ...formData, locationWarehouse: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Pricing and Stock Math */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Precio Venta ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Costo Proveedor ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: +e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Stock Actual</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: +e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Alerta Stock Bajo (Mín)</label>
              <input
                type="number"
                min="1"
                required
                value={formData.minStockThreshold}
                onChange={(e) => setFormData({ ...formData, minStockThreshold: +e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Descripción del Producto</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalles sobre materiales, aplicación, tolerancias..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Vehicle Compatibility Defaults */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Compatibilidad Primaria</span>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Marca (ej. Toyota)"
                value={formData.compatibleMake}
                onChange={(e) => setFormData({ ...formData, compatibleMake: e.target.value })}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
              />
              <input
                type="text"
                placeholder="Modelo (ej. Corolla)"
                value={formData.compatibleModel}
                onChange={(e) => setFormData({ ...formData, compatibleModel: e.target.value })}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
              />
              <input
                type="text"
                placeholder="Años (ej. 2018-2025)"
                value={formData.compatibleYear}
                onChange={(e) => setFormData({ ...formData, compatibleYear: e.target.value })}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
            >
              {productToEdit ? 'Guardar Cambios' : 'Registrar en Inventario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
