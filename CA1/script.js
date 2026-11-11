let allPeople = [];
let fields = [];
let activeFilters = [];

const fieldSelect = document.getElementById('filterField');
const filterContainer = document.getElementById('activeFilters');
const message = document.getElementById('message');
const tableContainer = document.getElementById('tableContainer');

function fieldLabel(field) {
  const labels = {
    id: 'ID',
    first_name: 'First name',
    last_name: 'Surname',
    fav_course: 'Favourite course',
    fav_dining_type: 'Favourite dining type'
  };

  return labels[field] ||
    field.replaceAll('_', ' ')
      .replace(/^./, letter => letter.toUpperCase());
}

function isTextField(field) {
  return field.toLowerCase().includes('name');
}

function matchingRecords(filters) {
  return allPeople.filter(person =>
    filters.every(filter => {
      const actual = String(person[filter.field] ?? '');

      if (isTextField(filter.field)) {
        return new RegExp(filter.pattern, 'i').test(actual);
      }

      return filter.values.length === 0 ||
        filter.values.includes(actual);
    })
  );
}

function renderTable(records) {
  const table = document.createElement('table');
  const head = document.createElement('thead');
  const headerRow = document.createElement('tr');

  fields.forEach(field => {
    const cell = document.createElement('th');
    cell.textContent = fieldLabel(field);
    headerRow.appendChild(cell);
  });

  head.appendChild(headerRow);
  table.appendChild(head);

  const body = document.createElement('tbody');

  records.forEach(person => {
    const row = document.createElement('tr');

    fields.forEach(field => {
      const cell = document.createElement('td');
      cell.textContent = person[field] ?? '';
      row.appendChild(cell);
    });

    body.appendChild(row);
  });

  table.appendChild(body);
  tableContainer.replaceChildren(table);

  if (records.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No matching records.';
    tableContainer.appendChild(empty);
  }

  document.getElementById('resultCount').textContent =
    `Showing ${records.length} of ${allPeople.length} records`;
}

function renderFilters() {
  filterContainer.replaceChildren();

  activeFilters.forEach(filter => {
    const card = document.createElement('div');
    card.className = 'filterCard';

    const heading = document.createElement('span');
    heading.className = 'filterTitle';

    if (isTextField(filter.field)) {
      heading.append(document.createTextNode(
        `${fieldLabel(filter.field)} should match `
      ));

      const strong = document.createElement('strong');
      strong.textContent = 'regular expression:';

      heading.appendChild(strong);
      card.appendChild(heading);

      const input = document.createElement('input');
      input.type = 'text';
      input.value = filter.pattern;

      input.setAttribute(
        'aria-label',
        `${fieldLabel(filter.field)} regular expression`
      );

      input.addEventListener('input', () => {
        filter.pattern = input.value;
      });

      card.appendChild(input);

    } else {
      heading.append(document.createTextNode('Include '));

      const strong = document.createElement('strong');
      strong.textContent = fieldLabel(filter.field).toLowerCase();

      heading.append(
        strong,
        document.createTextNode(' values:')
      );

      card.appendChild(heading);

      const choices = document.createElement('div');
      choices.className = 'choices';

      [...new Set(allPeople.map(person =>
        String(person[filter.field] ?? '')
      ))].sort().forEach(value => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.checked = filter.values.includes(value);

        checkbox.addEventListener('change', () => {
          filter.values = checkbox.checked
            ? [...filter.values, value]
            : filter.values.filter(item => item !== value);
        });

        label.append(
          checkbox,
          document.createTextNode(value)
        );

        choices.appendChild(label);
      });

      card.appendChild(choices);
    }

    const remove = document.createElement('button');
    remove.className = 'removeFilter';
    remove.type = 'button';
    remove.textContent = 'X';

    remove.setAttribute(
      'aria-label',
      `Remove ${fieldLabel(filter.field)} filter`
    );

    remove.addEventListener('click', () => {
      activeFilters = activeFilters.filter(item => item !== filter);

      message.textContent = '';
      renderFilters();
    });

    card.appendChild(remove);
    filterContainer.appendChild(card);
  });
}

function addSelectedFilter() {
  const field = fieldSelect.value;

  if (!field) return;

  if (activeFilters.some(filter => filter.field === field)) {
    message.textContent = 'That filter is already added.';
    return;
  }

  activeFilters.push(
    isTextField(field)
      ? { field, pattern: '' }
      : { field, values: [] }
  );

  fieldSelect.value = '';
  message.textContent = '';

  renderFilters();
}

function applyFilters() {
  try {
    activeFilters
      .filter(filter => isTextField(filter.field))
      .forEach(filter => new RegExp(filter.pattern));

    const filteredPeople = matchingRecords(activeFilters);

    message.textContent = '';
    renderTable(filteredPeople);

  } catch (error) {
    message.textContent = 'Invalid regular expression. Please check your input.';
  }
}

document.getElementById('apply')
  .addEventListener('click', applyFilters);

fieldSelect.addEventListener('change', addSelectedFilter);

fetch('dining.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  })
  .then(people => {
    if (!Array.isArray(people)) {
      throw new Error('Expected an array of records');
    }

    allPeople = people;
    fields = Object.keys(people[0] || {});

    fields
      .filter(field => field.toLowerCase() !== 'id')
      .forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = fieldLabel(field);
        fieldSelect.appendChild(option);
      });

    renderTable(allPeople);
  })
  .catch(error => {
    message.textContent =
      'Could not load dining.json. Open the folder with Live Server.';

    console.error(error);
  });
