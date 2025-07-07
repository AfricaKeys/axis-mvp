## JSX placeholder for tenant

import React from 'react';

const TenantPage = () => (
  <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
    <h1>Africa Keys Tenant Portal</h1>
    <form>
      <label>Full Name:</label><br />
      <input type="text" name="name" /><br /><br />
      <label>Unit Code:</label><br />
      <input type="text" name="unit" /><br /><br />
      <label>ID Upload:</label><br />
      <input type="file" name="document" /><br /><br />
      <button type="submit">Submit Lease</button>
    </form>
  </div>
);

export default TenantPage;
