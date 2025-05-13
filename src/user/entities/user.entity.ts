import { Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from '../enum/user.role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName:string

  @Column()
  lastName:string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

@Column({ default: false })
  IsBlocked:boolean


  @Column({
    type:'enum',
    enum:userRole,
    default:userRole.USER
  })
  role:userRole}
