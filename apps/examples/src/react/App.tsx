import React, { useState, useCallback } from 'react';
import { Cin7ThemeProvider, Page, Layout, Card, DataTable, Button, TextField, Badge, Modal, TextContainer } from '@cin7/polaris-adapter';
import { ProductRepository, ProductUseCase } from './domain';
import { useProductStore } from './store';
import enTranslations from '@shopify/polaris/locales/en.json';
import { formatCurrency } from '@cin7/core/utils';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProductStore();

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Table rows
  const rows = filteredProducts.map(product => [
    product.name,
    formatCurrency(product.price),
    product.stock > 20 ? (
      <Badge status="success">{product.stock} in stock</Badge>
    ) : product.stock > 0 ? (
      <Badge status="warning">{product.stock} low stock</Badge>
    ) : (
      <Badge status="critical">Out of stock</Badge>
    ),
    product.category,
    <Button.Group>
      <Button size="slim" onClick={() => handleEdit(product)}>Edit</Button>
      <Button size="slim" destructive onClick={() => handleDelete(product.id)}>Delete</Button>
    </Button.Group>
  ]);

  const handleEdit = useCallback((product: any) => {
    setSelectedProduct(product);
    setModalActive(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  }, [deleteProduct]);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
    setSelectedProduct(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (selectedProduct) {
      if (selectedProduct.id) {
        await updateProduct(selectedProduct.id, selectedProduct);
      } else {
        await addProduct(selectedProduct);
      }
      handleModalClose();
    }
  }, [selectedProduct, addProduct, updateProduct, handleModalClose]);

  return (
    <Cin7ThemeProvider i18n={enTranslations}>
      <Page
        title="React + Polaris Example"
        primaryAction={{
          content: 'Add product',
          onAction: () => {
            setSelectedProduct({ name: '', price: 0, stock: 0, category: '' });
            setModalActive(true);
          },
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <TextField
                  label="Search products"
                  value={searchValue}
                  onChange={setSearchValue}
                  autoComplete="off"
                  placeholder="Search by name..."
                  clearButton
                  onClearButtonClick={() => setSearchValue('')}
                />
              </Card.Section>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <DataTable
                columnContentTypes={['text', 'numeric', 'text', 'text', 'text']}
                headings={['Product', 'Price', 'Stock', 'Category', 'Actions']}
                rows={rows}
                loading={loading}
              />
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card>
              <Card.Section>
                <TextContainer>
                  <h3>Summary</h3>
                  <p>Total products: <strong>{products.length}</strong></p>
                  <p>Out of stock: <strong>{products.filter(p => p.stock === 0).length}</strong></p>
                  <p>Total value: <strong>{formatCurrency(
                    products.reduce((sum, p) => sum + (p.price * p.stock), 0)
                  )}</strong></p>
                </TextContainer>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>

        <Modal
          open={modalActive}
          onClose={handleModalClose}
          title={selectedProduct?.id ? 'Edit Product' : 'Add Product'}
          primaryAction={{
            content: 'Save',
            onAction: handleSave,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleModalClose,
            },
          ]}
        >
          <Modal.Section>
            {selectedProduct && (
              <TextField
                label="Product name"
                value={selectedProduct.name}
                onChange={(value) => setSelectedProduct({ ...selectedProduct, name: value })}
                autoComplete="off"
              />
            )}
          </Modal.Section>
        </Modal>
      </Page>
    </Cin7ThemeProvider>
  );
}