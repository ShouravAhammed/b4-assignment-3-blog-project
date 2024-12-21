import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'page',
      'limit',
      'fields',
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    if (queryObj.filter) {
      // Explicitly map 'filter' to 'author'
      this.modelQuery = this.modelQuery.find({ author: queryObj.filter });
    }

    //console.log('Final Filter Query:', this.modelQuery.getQuery()); // Debug log
    return this;
  }

  sort() {
    const sortBy = this.query?.sortBy || 'createdAt';
    const sortOrder = this.query?.sortOrder === 'desc' ? '-' : '';
    const sortQuery = `${sortOrder}${sortBy}`;
    //console.log('Sort Query:', sortQuery); // Debug log
    this.modelQuery = this.modelQuery.sort(sortQuery);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
