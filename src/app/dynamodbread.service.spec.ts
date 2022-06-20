import { TestBed } from '@angular/core/testing';

import { DynamodbreadService } from './dynamodbread.service';

describe('DynamodbreadService', () => {
  let service: DynamodbreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamodbreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
