import React, { useMemo } from 'react';
        import { 
          format, 
          startOfWeek, 
          endOfWeek, 
          eachDayOfInterval, 
          startOfMonth, 
          endOfMonth, 
          eachWeekOfInterval,
          isSameDay,
          parseISO,
          isToday,
          isSameMonth
        } from 'date-fns';
        import { es } from 'date-fns/locale';
        import { cn } from '../../../utils/cn';

        const CalendarView = ({
          currentDate,
          selectedDate,
          viewType,
          appointments = [],
          onDateSelect,
          onTimeSlotClick,
          onAppointmentClick,
          onDragStart,
          onDrop,
          draggedAppointment,
          className
        }) => {
          // Generate time slots for week view (8:00 AM to 8:00 PM, 30-minute intervals)
          const timeSlots = useMemo(() => {
            const slots = [];
            for (let hour = 8; hour < 20; hour++) {
              slots?.push(`${hour?.toString()?.padStart(2, '0')}:00`);
              slots?.push(`${hour?.toString()?.padStart(2, '0')}:30`);
            }
            return slots;
          }, []);

          // Get date range based on view type
          const dateRange = useMemo(() => {
            if (viewType === 'week') {
              return eachDayOfInterval({
                start: startOfWeek(currentDate, { locale: es }),
                end: endOfWeek(currentDate, { locale: es })
              });
            } else {
              const monthStart = startOfMonth(currentDate);
              const monthEnd = endOfMonth(currentDate);
              const weeks = eachWeekOfInterval({
                start: monthStart,
                end: monthEnd
              }, { locale: es });
              
              return weeks?.flatMap(weekStart =>
                eachDayOfInterval({
                  start: startOfWeek(weekStart, { locale: es }),
                  end: endOfWeek(weekStart, { locale: es })
                })
              );
            }
          }, [currentDate, viewType]);

          // Get appointments for a specific date and time
          const getAppointmentsForSlot = (date, time) => {
            return appointments?.filter(apt => 
              isSameDay(parseISO(apt?.date), date) && 
              apt?.startTime === time
            );
          };

          // Get status color classes
          const getStatusColor = (status) => {
            switch (status) {
              case 'confirmada':
                return 'bg-green-100 border-green-300 text-green-800';
              case 'pendiente':
                return 'bg-yellow-100 border-yellow-300 text-yellow-800';
              case 'cancelada':
                return 'bg-red-100 border-red-300 text-red-800';
              default:
                return 'bg-gray-100 border-gray-300 text-gray-800';
            }
          };

          const getTypeColor = (type) => {
            switch (type) {
              case 'consulta':
                return 'bg-blue-500';
              case 'revision':
                return 'bg-green-500';
              case 'urgencia':
                return 'bg-red-500';
              case 'seguimiento':
                return 'bg-purple-500';
              case 'cirugia':
                return 'bg-orange-500';
              default:
                return 'bg-gray-500';
            }
          };

          // Handle drag and drop events
          const handleDragOver = (e) => {
            e?.preventDefault();
          };

          const handleDropEvent = (e, date, time) => {
            e?.preventDefault();
            onDrop?.(date, time);
          };

          // Render appointment card
          const renderAppointmentCard = (appointment) => (
            <div
              key={appointment?.id}
              className={cn(
                "text-xs rounded-md border p-2 mb-1 cursor-pointer transition-all hover:shadow-md",
                getStatusColor(appointment?.status),
                draggedAppointment?.id === appointment?.id && "opacity-50"
              )}
              draggable
              onDragStart={() => onDragStart?.(appointment)}
              onClick={() => onAppointmentClick?.(appointment)}
            >
              <div className="flex items-center space-x-1 mb-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  getTypeColor(appointment?.type)
                )}></div>
                <span className="font-medium truncate">
                  {appointment?.patientName}
                </span>
              </div>
              <div className="text-xs opacity-75">
                {appointment?.startTime} - {appointment?.type}
              </div>
              {appointment?.reason && (
                <div className="text-xs opacity-60 truncate mt-1">
                  {appointment?.reason}
                </div>
              )}
            </div>
          );

          // Week View
          const renderWeekView = () => (
            <div className="bg-card border border-border rounded-lg shadow-medical overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-8 border-b border-border">
                <div className="p-3 bg-muted text-center text-sm font-medium text-text-secondary">
                  Hora
                </div>
                {dateRange?.map(date => (
                  <div
                    key={date?.toISOString()}
                    className={cn(
                      "p-3 text-center border-l border-border cursor-pointer transition-colors hover:bg-accent",
                      isSameDay(date, selectedDate) && "bg-primary/10 text-primary",
                      isToday(date) && "font-semibold"
                    )}
                    onClick={() => onDateSelect?.(date)}
                  >
                    <div className="text-sm font-medium">
                      {format(date, 'EEEE', { locale: es })}
                    </div>
                    <div className={cn(
                      "text-lg",
                      isToday(date) && "text-primary"
                    )}>
                      {format(date, 'd', { locale: es })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="max-h-96 overflow-y-auto">
                {timeSlots?.map(timeSlot => (
                  <div key={timeSlot} className="grid grid-cols-8 border-b border-border last:border-b-0">
                    <div className="p-2 bg-muted text-center text-sm text-text-secondary border-r border-border">
                      {timeSlot}
                    </div>
                    {dateRange?.map(date => {
                      const slotAppointments = getAppointmentsForSlot(date, timeSlot);
                      return (
                        <div
                          key={`${date?.toISOString()}-${timeSlot}`}
                          className="p-1 border-l border-border min-h-16 cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => onTimeSlotClick?.(date, timeSlot)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropEvent(e, date, timeSlot)}
                        >
                          {slotAppointments?.map(appointment => 
                            renderAppointmentCard(appointment)
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );

          // Month View
          const renderMonthView = () => {
            const weeks = [];
            for (let i = 0; i < dateRange?.length; i += 7) {
              weeks?.push(dateRange?.slice(i, i + 7));
            }

            return (
              <div className="bg-card border border-border rounded-lg shadow-medical overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-7 border-b border-border">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']?.map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-text-secondary bg-muted">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-rows-auto">
                  {weeks?.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7">
                      {week?.map(date => {
                        const dayAppointments = appointments?.filter(apt => 
                          isSameDay(parseISO(apt?.date), date)
                        );

                        return (
                          <div
                            key={date?.toISOString()}
                            className={cn(
                              "h-24 p-2 border-r border-b border-border cursor-pointer hover:bg-accent/50 transition-colors",
                              !isSameMonth(date, currentDate) && "bg-muted text-text-secondary",
                              isSameDay(date, selectedDate) && "bg-primary/10 ring-1 ring-primary",
                              isToday(date) && "bg-primary/5"
                            )}
                            onClick={() => onDateSelect?.(date)}
                          >
                            <div className={cn(
                              "text-sm font-medium mb-1",
                              isToday(date) && "text-primary"
                            )}>
                              {format(date, 'd')}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              {dayAppointments?.slice(0, 2)?.map(appointment => (
                                <div
                                  key={appointment?.id}
                                  className={cn(
                                    "text-xs px-1 rounded truncate",
                                    getStatusColor(appointment?.status)
                                  )}
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    onAppointmentClick?.(appointment);
                                  }}
                                >
                                  {appointment?.startTime} {appointment?.patientName}
                                </div>
                              ))}
                              {dayAppointments?.length > 2 && (
                                <div className="text-xs text-text-secondary">
                                  +{dayAppointments?.length - 2} más
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          };

          return (
            <div className={cn("", className)}>
              {viewType === 'week' ? renderWeekView() : renderMonthView()}
            </div>
          );
        };

        export default CalendarView;