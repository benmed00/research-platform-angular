import { UserRole } from '../models/user.model';
import {
  formatActiveStatus,
  formatEquipmentStatus,
  formatMissionStatus,
  formatUserRole
} from './display-formatters';

describe('display-formatters', () => {
  it('should format user roles in French', () => {
    expect(formatUserRole(UserRole.BOTANISTE)).toBe('Botaniste');
    expect(formatUserRole('UNKNOWN')).toBe('UNKNOWN');
  });

  it('should format active status labels', () => {
    expect(formatActiveStatus(true)).toBe('Actif');
    expect(formatActiveStatus(false)).toBe('Inactif');
  });

  it('should format mission and equipment statuses', () => {
    expect(formatMissionStatus('IN_PROGRESS')).toBe('En cours');
    expect(formatEquipmentStatus('MAINTENANCE')).toBe('Maintenance');
  });
});
