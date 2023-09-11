import Table from 'cli-table';

function unitsFormatter(bytes) {
  const megaBytes = bytes / (1000 * 1000);

  if (megaBytes < 1000) {
    return `${megaBytes.toFixed(2)}MB`;
  }

  const gigaBytes = megaBytes / 1000;
  return `${gigaBytes.toFixed(2)}GB`;
}

function generateTable({ entries, totalSize }) {
  const table = new Table({
    head: ['Path', 'Size'],
    colWidths: [100, 15],
    style: {
      head: ['green', 'bold'],
    },
  });

  for (const entry of entries) {
    table.push([entry.path, `${unitsFormatter(entry.size)}`]);
  }

  table.push(['Total size', `${unitsFormatter(totalSize)}`]);
  console.log(table.toString());
}

export default {
  generateTable,
  unitsFormatter,
};
